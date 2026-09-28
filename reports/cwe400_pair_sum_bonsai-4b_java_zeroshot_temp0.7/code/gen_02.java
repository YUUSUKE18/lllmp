import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        int target = scanner.nextInt();
        
        List<Integer> numbers = new ArrayList<>();
        
        while (scanner.hasNextInt()) {
            int num = scanner.nextInt();
            numbers.add(num);
        }
        
        int count = 0;
        Set<Integer> pairs = new HashSet<>();
        
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairs.add(Arrays.asList(numbers.get(i), numbers.get(j)));
                }
            }
        }
        
        System.out.println("pairs=" + pairs.size());
    }
}
