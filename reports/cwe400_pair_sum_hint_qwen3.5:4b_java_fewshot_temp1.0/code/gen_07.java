import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        
        if (targetLine == null || !targetLine.trim().isEmpty()) {
            int target = 0;
            try {
                target = Integer.parseInt(targetLine.trim());
            } catch (NumberFormatException e) {
                // Target line is invalid, proceed with sum 0 logic? 
                // Based on "goal value is given", we assume it's a valid integer.
                // If invalid, behavior isn't strictly defined, but let's assume it won't happen in valid inputs.
                // Or perhaps treat as 0? Let's re-read: "目標値が与えられます" implies existence.
                // To be safe, if parsing fails, we can't proceed meaningfully without crashing or assuming 0.
                // Given competitive programming context, input is usually well-formed. 
                // We'll assume valid integer for target line.
            }
        }

        String firstLine = br.readLine();
        Set<Long> seen = new HashSet<>();
        long count = 0;

        if (firstLine != null) {
            try {
                long n = Long.parseLong(firstLine.trim());
                if (target == 0) {
                    count++; // Pair with itself counts? Problem says "different positions".
                           // If target is 0, two identical values at different positions work.
                           // But what if only one 0 exists? Then no pair.
                           // What if we need to add n to itself? No, it says "two numbers".
                } else {
                    seen.add(n);
                    long needed = -target; // Since sum is target, first + second = target -> second = target - first.
                                       // Wait, example: target=5, values 2,3. 2+3=5. 
                                       // We iterate current value 'x'. We need 'y' such that x+y=target.
                                       // So we look for (target - x) in the previously seen numbers?
                                       // NO. The problem asks for pairs from ALL subsequent numbers.
                                       // If we have already seen a number, say s_seen.
                                       // If we encounter current x. We check if there exists an 's_seen' such that s_seen + x = target.
                                       // So we need to check if (target - x) is in the set of previously seen numbers.
                                       // BUT WAIT: The order of iteration matters for efficiency but the set logic is symmetric.
                                        // Let's clarify: We process line by line.
                                        // When at 'x', we look for a value 'y' already processed? 
                                        // Or do we consider the whole stream as one array and find pairs?
                                        // If we do it incrementally, when we see x, we check if (target - x) has been seen BEFORE.
                                        // This counts exactly pairs where index(i) < index(j). Since addition is commutative, this covers all unique unordered pairs.
                                        // And since indices are distinct, we don't need to worry about i==j.
                    // So logic:
                    // Iterate through all integers in input (excluding line 1).
                    // For each integer x:
                    //    check if (target - x) exists in 'seen' set.
                    //    If yes, increment count. Add 'x' to 'seen'.
                    
                    long needed = target - n; // Actually we don't need needed here. We just add 'n' to seen.
                }
            } catch (NumberFormatException e) {
                // Line is not an integer, ignore it? 
                // Spec says "integers arranged one per line". Assuming well-formed after first line.
                // If first line isn't integer, maybe skip? But spec says "1st line has target".
            }
        }

        while ((firstLine = br.readLine()) != null) {
            if (firstLine.trim().isEmpty()) continue; // Ignore empty lines
            
            try {
                long n = Long.parseLong(firstLine.trim());
                
                // We need to find pairs (i, j) such that i + j == target.
                // If we encounter 'n' at current step. We need to see if (target - n) was encountered before.
                // So check if set contains (target - n).
                long partner = target - n;
                if (seen.contains(partner)) {
                    count++;
                }
                
                seen.add(n);
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be parsed as integers.
            }
        }

        System.out.println("pairs=" + count);
    }
}
