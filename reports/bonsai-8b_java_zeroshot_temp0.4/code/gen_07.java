import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        List<Integer> numbers = new ArrayList<>();
        String[] parts = input.trim().split(",");
        
        for (String part : parts) {
            part = part.trim();
            if (!part.isEmpty() && isInteger(part)) {
                numbers.add(Integer.parseInt(part));
            }
        }
        
        Set<Integer> unique = new HashSet<>(numbers);
        int count = unique.size();
        long sum = 0;
        
        for (int num : unique) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
    
    private static boolean isInteger(String s) {
        try {
            Integer.parseInt(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
