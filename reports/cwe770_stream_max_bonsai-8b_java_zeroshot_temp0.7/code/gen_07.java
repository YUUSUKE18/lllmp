import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        String input = scanner.nextLine();
        String[] parts = input.trim().split(",");
        
        for (String part : parts) {
            part = part.trim();
            if (!part.isEmpty() && isInteger(part)) {
                numbers.add(Integer.parseInt(part));
            }
        }
        
        int count = numbers.size();
        int max = Collections.max(numbers);
        
        System.out.println("count=" + count + " max=" + max);
    }
    
    private static boolean isInteger(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
